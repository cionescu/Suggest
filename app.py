from flask import Flask, render_template, request
import json

app = Flask(__name__)

cars = ["Abarth", "Alfa Romeo", "Acura", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti"]
clothes = ["A-Wear", "A Wear", "Abercrombie & Fitch", "Accessorize", "Acne", "Ada Zanditon",
"Adele Marie", "Adidas", "Adidas by Stella McCartney", "Adler", "Aftershock", "Agent Provocateur"]
laptop = ["Acer", "Asus", "Apple", "Dell", "HP", "Lenovo", "Samsung", "Sony", "Toshiba"]

def search(query, array):
    result = []
    for a in array:
        if query in a.lower():
            result.append({"name" : a, "url": "http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png", "description" : "Some random description"})
    return result

def returnMatchJson(query):
    result = []
    q = query.lower()
    
    c = search(q, cars)
    if c != []:
        result.append({"title": "Cars", "data" : c})

    cl = search(q, clothes)
    if cl != []:
        result.append({"title": "Clothes", "data" : cl})

    l = search(q, laptop)
    if l != []:
        result.append({"title": "Laptops", "data" : l})

    return result

@app.route("/")
def index():
    if request.args.get('query') == None:
        return render_template('index.html')
    else:
        res = returnMatchJson(request.args.get("query"))

        return json.dumps(res, indent=4)

if __name__ == "__main__":
    app.run(debug=True)