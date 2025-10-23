import os
from openai import OpenAI
from dotenv import load_dotenv
import time

def get_nm_files(directory):
    """Gets all .txt files from a directory."""
    files = []
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            files.append(os.path.join(directory, filename))
    return files

def read_file_content(filepath):
    """Reads the content of a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file_content(filepath, content):
    """Writes content to a file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def evaluate_nm(client, nm_content, criteria, template):
    """Evaluates a notional machine using OpenAI API."""
    prompt = f"""
You are an expert in computer science education. Your task is to evaluate a "notional machine" (an analogy or representation for a programming concept) based on a given set of criteria.

Here is the notional machine description:
--- NM START ---
{nm_content}
--- NM END ---

Here is the marking criteria:
--- CRITERIA START ---
{criteria}
--- CRITERIA END ---

And here is the evaluation form you need to fill out. Please provide a mark and a reason for each section based on the criteria.
--- EVALUATION FORM TEMPLATE START ---
{template}
--- EVALUATION FORM TEMPLATE END ---

Please fill out the evaluation form with your assessment.
"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in evaluating educational tools for computer science."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred while calling OpenAI API: {e}")
        return None

def main():
    """Main function to run the evaluation."""
    start = time.perf_counter()

    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable not set.")
        return
    
    client = OpenAI(api_key=api_key)

    # Define paths

    # nm_dir = "test_NMs"
    nm_dir = "formal_NMs"

    # eval_dir = "test_EVALs"
    # eval_dir = "gpt4o_EVALs_criteria1_and_template1"
    # eval_dir = "gpt4o_EVALs_criteria1_and_template2"
    eval_dir = "gpt4o_EVALs_criteria2_and_template2"

    # eval_dir = "o3_EVALs_more_specific_criteria"

    # criteria_file = "marking_criteria.txt"
    criteria_file = "marking_criteria2.txt"
    # Use a generic template file name, or a specific one if it's always the same
    # template_file = os.path.join('sample_ios', "evaluation_template.txt")
    template_file = os.path.join('sample_ios', "evaluation_template2.txt")

    # Avoid overwriting existing evaluation files by wrong running
    txt_files = [f for f in os.listdir(eval_dir) if f.endswith('.txt')]
    if txt_files:
        print(f"Warning: {len(txt_files)} .txt file(s) found in '{eval_dir}'.")
        print("To avoid overwriting existing files, the program will now exit.")
        sys.exit(1)

    # Get NM files
    nm_files = get_nm_files(nm_dir)
    if not nm_files:
        print(f"No .txt files found in {nm_dir}")
        return

    # Read criteria and template
    criteria = read_file_content(criteria_file)
    template = read_file_content(template_file)
    
    print(f"Found {len(nm_files)} notional machines to evaluate.")

    for nm_file_path in nm_files:
        print(f"Evaluating {nm_file_path}...")
        nm_content = read_file_content(nm_file_path)

        evaluation_result = evaluate_nm(client, nm_content, criteria, template)

        if evaluation_result:
            nm_filename = os.path.basename(nm_file_path)
            eval_filename = nm_filename.replace('.txt', '_evaluation.txt')
            output_path = os.path.join(eval_dir, eval_filename)
            
            write_file_content(output_path, evaluation_result)
            print(f"Evaluation saved to {output_path}")
    end = time.perf_counter()
    print("All evaluations complete.")
    print(f"Evaluation time: {end - start:.6f} seconds")

if __name__ == "__main__":
    main()