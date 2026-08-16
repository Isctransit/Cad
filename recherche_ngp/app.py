from flask import Flask, render_template
import json

with open("data.json", encoding="utf-8") as f:
    donnees = json.load(f)

app = Flask(__name__)

@app.route("/")
def accueil():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
