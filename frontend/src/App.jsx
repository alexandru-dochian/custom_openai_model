import { React, Component } from "react";
import "./App.css";
import AskBox from "./components/AskBox";
import Loading from "./components/common/loading/Loading";

const baseUrl = "http://localhost:9000"

const HistoryItem = ({ source, message }) => {
  const className = "historyItem " + (source === "Robot" ? 'robot' : 'user');
  return (
    <div className={className}>
      <div className="source"> {source} says </div>
      <div className="message"> {message}</div>
    </div>
  );
};

class App extends Component {
  state = {
    searchBoxValue: "",
    response: null,
    history: [],
    processing: false,
  }

  handleSearchBoxValue = (searchBoxValue) => {
    this.setState({ searchBoxValue: searchBoxValue });
  };

  handleSearchBoxAction = async () => {
    const {
      searchBoxValue,
      history,
    } = this.state;

    if (searchBoxValue === "") {
      return;
    }
    let newHistory = [...history]

    this.setState({ processing: true, searchBoxValue: "" });
    try {
      newHistory.push({
        "source": "User",
        "message": searchBoxValue
      })
      const response = await this.fetchData(searchBoxValue)
      newHistory.push({
        "source": "Robot",
        "message": response
      })
    } catch (error) {
      alert("Error! Lol!")
    } finally {
      this.setState({ processing: false, history: newHistory });
    }
  };

  fetchData = async (searchBoxValue) => {
    let response = await fetch(`${baseUrl}/query`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "query_string": searchBoxValue
      })
    });
    let responseText = await response.text();
    return responseText
  }

  renderInputQuery = () => {
    const {
      searchBoxValue,
      processing,
    } = this.state;

    if (processing) {
      return <Loading></Loading>
    } else {
      return <AskBox
        value={searchBoxValue}
        onChange={this.handleSearchBoxValue}
        onClick={this.handleSearchBoxAction}
        placeHolder="Ask EnerGPT to complete something"
      />
    }
  }

  renderHistory = () => {
    const {
      history,
    } = this.state;
    return history.map((historyItem, index) => <HistoryItem key={index} source={historyItem["source"]} message={historyItem["message"]} />)
  }

  render() {
    return (
      <div className="global_wrapper">
        <div className="info">
          <h1>ENER GPT</h1>
          <h2>We have overfitted openai's base model `davinci` with information from Verra Registry - Terms of Use</h2>
          <h3>The document used for training can be found <a target="_blank" href="https://verra.org/wp-content/uploads/Verra-Registry-TOU-September-2021_FINAL-1.pdf">here</a></h3>
          <h3>Please interact with the model and ask him to complete your sentences (e.g. Verra is ).</h3>
        </div>

        <div className="history">
          {this.renderHistory()}
        </div>
        <div className="query">
          {this.renderInputQuery()}
        </div>
      </div>
    );
  }
}

export default App;
