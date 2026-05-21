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
    timeout=httpx.Timeout(30.0, connect=10.0)
)

DEFAULT_PROMPT = """请分析这张照片中人物的脸型，禁止对照片进行改动，只能做分析并按以下格式回答：
脸型：[圆脸/方脸/长脸/鹅蛋脸/心形脸/菱形脸]
特点：[简要描述面部特点]
推荐发型：[列出3款适合的发型]
避免发型：[列出2款不适合的发型]"""


def analyze_face(image_path: str, prompt: str = DEFAULT_PROMPT) -> str:
    """
    分析照片中人物的脸型
    参数:
        image_path: 照片本地路径
        prompt: 自定义提示词（可选）
    返回:
        脸型分析结果字符串
    """
    image_path = os.path.abspath(image_path.strip('"').strip("'"))

    if not os.path.exists(image_path):
        return f"找不到照片：{image_path}"

    try:
        with open(image_path, "rb") as f:
            img_base64 = base64.b64encode(f.read()).decode()

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"}},
                    {"type": "text", "text": prompt}
                ]
            }],
            temperature=0.2
        )
        return response.choices[0].message.content

    except httpx.TimeoutException:
        return "分析超时（30秒），请上传更清晰的照片后重试"
    except Exception as e:
        return f"分析失败：{str(e)}"
