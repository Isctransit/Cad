from flask import Flask, render_template, request
import json

with open("data.json", encoding="utf-8") as f:
    donnees = json.load(f)

app = Flask(__name__)

@app.route("/")
def accueil():
    return render_template("index.html")

@app.route("/recherche")
def recherche():
    mot = request.args.get("q", "")

if __name__ == "__main__":
    app.run(debug=True)
