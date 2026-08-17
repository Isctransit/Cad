from flask import Flask, render_template, request
import json
import unicodedata

def normaliser(texte):
    texte = unicodedata.normalize("NFD", texte)
    resultat = ""
    for c in texte:
        if not unicodedata.combining(c):
            resultat += c
    return resultat.lower()

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
            trouve = normaliser(mot) in normaliser(p["designation"])
        if trouve:
            resultats.append(p)

    nombre = len(resultats)
    return render_template("resultats.html", mot=mot, resultats=resultats, nombre=nombre)

if __name__ == "__main__":
    app.run(debug=True)
