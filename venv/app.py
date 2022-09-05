from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
   return render_template("index.html")

@app.route('/music')
def music():
   return render_template("index.html",pageName="home")

@app.route('/game')
def game():
   return render_template("index.html",pageName="home")

@app.route('/sports')
def sports():
   return render_template("index.html")

if __name__ == '__main__':
   app.run('0.0.0.0',port=6070,debug=True)

print("hello")