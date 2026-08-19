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
    mode = request.args.get("mode", "")

    if mode == "code":
        mode_code = True
    elif mode == "mot":
        mode_code = False
    else:
        mode_code = mot.isdigit() and mot != ""

    termes = []
    for morceau in mot.split(","):
        morceau = morceau.strip()
        if morceau:
            termes.append(morceau)

    resultats = []
    for p in donnees["produits"]:
        if mode_code:
            trouve = p["ngp"].startswith(mot)
        else:
            trouve = True
            for t in termes:
                if normaliser(t) not in normaliser(p["designation"]):
                    trouve = False
        if trouve:
            resultats.append(p)

    nombre = len(resultats)
    return render_template("resultats.html", mot=mot, resultats=resultats, nombre=nombre)

if __name__ == "__main__":
    app.run(debug=True)
