import './style';
import { h, render, Component } from 'preact';

class MoneeClock extends Component {
    constructor() {
        super();
        this.state.moneypersec = 100; // TODO: change this to a variable via input
        this.state.time = Date.now();
        this.state.starttime = Date.now();
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render(props, state) {
        let moneee = Moneee(
            Seconds(state.starttime, state.time),
            state.moneypersec
        );
        return <div class="center">
            <h1>💸💸💸</h1>
            <h1>You've made: <div>{ moneee } €</div></h1>
            <iframe src="https://giphy.com/embed/3oFzmqENRBkRTRfLcA" width="240" height="135" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/3oFzmqENRBkRTRfLcA">via GIPHY</a></p>
        </div>;
    }
}


function Seconds(start,newt) {
    return (newt - start)/ 1000;
}
function Moneee(seconds, moneypersec) {
    return Math.round(seconds * moneypersec * 100) / 100;
}

// render an instance of MoneeClock into <body>:
render(<MoneeClock />, document.body);