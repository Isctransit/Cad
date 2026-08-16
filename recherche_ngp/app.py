from flask import Flask
import json

with open("data.json", encoding="utf-8") as f:
    donnees = json.load(f)

app = Flask(__name__)

@app.route("/")
def accueil():
    return "Bonjour !"

if __name__ == "__main__":
    app.run(debug=True)
