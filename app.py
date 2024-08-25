from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('Project2(Currency Converter).html')

if __name__ == '__main__':
    app.run(debug=True)