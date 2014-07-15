from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route("/")
def index():
    if request.args.get('query') == None:
        return render_template('index.html')
    else:
        res = []
        for i in xrange(1, (len(request.args.get('query'))+1) ):
            data = []
            for j in xrange(0, 1):
                data.append({'name' : str(i) + " " + str(j), 'url' : "http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png"})
            res.append({"title": "section "+str(i), "data": data})
        return json.dumps(res, indent=2)

if __name__ == "__main__":
    app.run(debug=True)