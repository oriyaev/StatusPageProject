from flask import Flask, request, jsonify

app = Flask(__name__)

statuses = []


@app.route("/statusPage", methods=["GET", "POST"])
def handle_statuses():
    if request.method == "GET":
        return jsonify({"statuses": statuses})
    elif request.method == "POST":
        data = request.json
        new_status = data.get("status")
        if new_status:
            statuses.append(new_status)
            return jsonify({"message": "Status added successfully"})
        else:
            return jsonify({"error": "No status provided"}), 400


if __name__ == '__main__':
    app.run(debug=True)
