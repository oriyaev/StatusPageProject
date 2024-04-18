from flask import Flask, request, jsonify

app = Flask(__name__)

statuses = []


@app.route("/handleStatuses", methods=["GET", "POST", "DELETE"])
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

    elif request.method == "DELETE":
        data = request.json
        if data.get("shouldResetAll"):
            statuses.clear()
        else:
            statuses.remove(data.get("status"))
        return jsonify({"statuses": statuses})


if __name__ == '__main__':
    app.run(debug=True)