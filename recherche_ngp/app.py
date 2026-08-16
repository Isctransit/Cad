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

    resultats = []
    for p in donnees["produits"]:
        if mot.lower() in p["designation"].lower():
            resultats.append(p)

    return f"{len(resultats)} résultat(s) trouvé(s) pour '{mot}'"

if __name__ == "__main__":
    app.run(debug=True)
