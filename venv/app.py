from urllib import request
from flask import Flask, render_template, request, jsonify,redirect,url_for
from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.l5fmn4e.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

app = Flask(__name__)

@app.route('/')
def home():
   return render_template("index.html")

@app.route('/music')
def music():
   return render_template("index.html")

@app.route('/game')
def game():
   return render_template("index.html")

@app.route('/sports')
def sports():
   return render_template("index.html")

@app.route('/join',methods=['POST','GET'])
def join():
   if request.method == 'POST':
    try:
      id = request.form['formData[id]']
      password = request.form['formData[password]']
      user = db.users.find_one({"id":id})
      print(id,password,user)
      if user is not None:
        return redirect(url_for('join'),code=400)
      data = {
        'id' : id,
        'password' : password,
        'videos' : []
      }
      db.users.insert_one(data)
      return jsonify({"msg":"good"})
    except ValueError:
      print('회원가입 실패',ValueError)
      return redirect(url_for('join'),code=400)
   return render_template("join.html")


@app.route('/log-in',methods=['POST','GET'])
def login():
  if request.method == 'POST':
    try:
      id = request.form['formData[id]']
      password = request.form['formData[password]']
      user = db.users.find_one({"id":id})
      if user == None:
        print(user)
        return redirect(url_for("login"),code=400)
      if str(user['password']) != str(password):
        print(user['password'],password)
        return redirect(url_for("login"),code=400)

      return jsonify({"msg":"good"})
    except ValueError:
      print('로그인 실패',ValueError)
      return redirect(url_for("login"))
  return render_template("log-in.html")



if __name__ == '__main__':
   app.run('0.0.0.0',port=6070,debug=True)

print("hello")

