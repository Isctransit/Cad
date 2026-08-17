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
    mode_code = mot.isdigit() and mot != ""

    resultats = []
    for p in donnees["produits"]:
        if mode_code:
            trouve = p["ngp"].startswith(mot)
        else:
            trouve = mot.lower() in p["designation"].lower()
        if trouve:
            resultats.append(p)

    nombre = len(resultats)
    return render_template("resultats.html", mot=mot, resultats=resultats, nombre=nombre)

if __name__ == "__main__":
    app.run(debug=True)
