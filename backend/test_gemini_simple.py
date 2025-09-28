import google.generativeai as genai
import os

# Configure the API key from the environment variable.
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# You can choose between 'gemini-1.5-pro' for high-quality,
# or 'gemini-1.5-flash' for speed and efficiency.
model = genai.GenerativeModel('gemini-1.5-pro')

# The prompt you want to send to the Gemini model.
prompt = "Give me a simple recipe for chocolate chip cookies."

try:
    # Send the prompt to the model and get the response.
    response = model.generate_content(prompt)

    # Print the model's response text.
    print(response.text)

except Exception as e:
    print(f"An error occurred: {e}")

