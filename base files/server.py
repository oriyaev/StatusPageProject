from flask import Flask, request, jsonify

app = Flask(__name__)

statuses = []
names = []


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


@app.route("/handleNames", methods=["GET", "POST", "DELETE"])
def handle_names():
    if request.method == "GET":
        return jsonify({"names": names})

    elif request.method == "POST":
        data = request.json
        new_name = data.get("name")
        from_status = data.get("from_status")
        to_status = data.get("to_status")
        user_data = {"name": new_name, "from_status": from_status, "to_status": to_status}
        if new_name:
            names.append(user_data)
            return jsonify({"message": "name added successfully"})
        else:
            return jsonify({"error": "No name provided"}), 400

    elif request.method == "DELETE":
        data = request.json
        if data.get("shouldResetAll"):
            names.clear()
        else:
            names.remove(data.get("name"))
        return jsonify({"names": names})


if __name__ == '__main__':
    app.run(debug=True)