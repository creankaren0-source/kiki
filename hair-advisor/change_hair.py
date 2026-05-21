import os
import base64
from openai import OpenAI
from dotenv import load_dotenv
import httpx

load_dotenv()

STEP_API_KEY = os.getenv("STEP_API_KEY")
STEP_BASE_URL = os.getenv("STEP_BASE_URL", "https://api.stepfun.com/v1")

client = OpenAI(
    api_key=STEP_API_KEY,
    base_url=STEP_BASE_URL,
    timeout=httpx.Timeout(60.0, connect=10.0)  # 60s for image editing
)

DEFAULT_PROMPT = """保持人脸完全不变，禁止对脸部做改动；只修改头发部分，将发型改为：{hair_desc}。
要求：
- 头发与脸部边缘自然融合
- 保持原图的光照、色调、角度一致
- 不要变形、不要扭曲五官"""


def change_hair(image_path: str, hair_desc: str, prompt: str = None) -> str:
    """
    给照片中的人物换发型
    参数:
        image_path: 照片本地路径
        hair_desc: 发型描述，如"法式慵懒卷发"
        prompt: 自定义提示词（可选）
    返回:
        成功时返回图片保存路径，失败时返回错误信息
    """
    image_path = os.path.abspath(image_path.strip('"').strip("'"))

    if not os.path.exists(image_path):
        return f"找不到照片：{image_path}"

    # DeepSeek 没有 images.edit 接口，直接返回提示
    import os as _os
    from dotenv import load_dotenv as _load
    _load()
    _STEP_BASE_URL = os.getenv("STEP_BASE_URL", "")
    if "deepseek" in _STEP_BASE_URL:
        return "当前使用 DeepSeek API，暂不支持生成效果图（需要 StepFun 账号）。脸型分析可正常使用。"

    if prompt is None:
        prompt = DEFAULT_PROMPT.format(hair_desc=hair_desc)

    try:
        with open(image_path, "rb") as img_file:
            res = client.images.edit(
                model="step-image-edit-2",
                image=img_file,
                prompt=prompt,
                response_format="b64_json",
                extra_body={
                    "steps": 25,
                    "cfg_scale": 8.5,
                    "negative_prompt": "脸部变形,扭曲,模糊,低画质,五官错乱"
                }
            )
        img_bytes = base64.b64decode(res.data[0].b64_json)
        # 使用UUID作为文件名，避免中文路径问题
        import uuid
        output_name = f"result_{uuid.uuid4().hex[:16]}.png"
        output_path = f"results/{output_name}"
        os.makedirs("results", exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(img_bytes)
        result_abs = os.path.abspath(output_path)
        print(f"[change_hair] saved to: {result_abs}, exists={os.path.exists(result_abs)}")
        return f"已保存至：{result_abs}"

    except httpx.TimeoutException:
        return "生成效果图超时（60秒），请上传更清晰的照片后重试"
    except Exception as e:
        return f"生成效果图失败：{str(e)}"
