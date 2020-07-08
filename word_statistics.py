import logging
import os
import time
import re
from flask import jsonify, request, Flask, render_template
from flask_cors import CORS

app = Flask(__name__)

local_storage_file = 'text_file'

def process_input(string_content):
    chars = 0
    p = re.compile(r'[^\s]+')
    words = string_content.split(" ")
    words_space_removed = re.findall(p, string_content)
    for w in words_space_removed:
        chars += len(w)
    return

@app.route('/word_stat_home', methods=['GET', 'POST'])
def main_page():
    ''' The basic page '''
    return render_template('word_stat_home.html')

@app.route('/text_input', methods=['POST'])
def para_input():
    input_data = request.data
    with open(local_storage_file, 'w') as fp:
        fp.write(str(input_data))
    return jsonify({"status": "OK"})

@app.route('/output', methods=['GET', 'POST'])
def analysed_op():
    wc = 0
    char_count = 0
    content = None
    try:
        with open(local_storage_file, 'r') as fp:
            content = fp.read()
        wc, char_count = process_input(str(content))
    except FileNotFoundError:
        op_payload = {"status": "ERROR"}

    op_payload = {
        "status": "Ok",
        "wc": wc,
        "cleaned_text": content
    }
    return jsonify(op_payload)

if __name__ == '__main__':
    app.run()