import alt from "../alt";
import axios from "axios";

class GwasActions {
    constructor() {
        this.generateActions("updateResults", "updateTraits", "updateRequests");
    }

    search(query) {
        axios.get("/search/", { params: { q: query } })
        .then((response) => {
            this.actions.updateResults(response.data.results);
        })
        .catch((response) => {
            console.error(response);
        });
    }

    fetchTraits() {
        axios.get("/traits")
        .then((response) => {
            this.actions.updateTraits(response.data.traits);
        });
    }

    fetchRequests() {
        axios.get("/requests")
        .then((response) => {
            this.actions.updateRequests(response.data.requests);
        });
    }
}

export default alt.createActions(GwasActions);
