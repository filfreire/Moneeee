import './style';
import { h, render, Component } from 'preact';

class MoneeClock extends Component {
    constructor() {
        super();
        // TODO: improve this crappy code, and crappy input
        this.state.moneypersec = ((prompt("I make per month (20 work days, 8h a day)", 1500))/20)/8/60/60;
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
            <h1>💸💸💸</h1>
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