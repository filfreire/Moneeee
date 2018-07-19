import './style';
import { h, render, Component } from 'preact';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-108436742-2'); //refactor how UA code is obtained

class MainSection extends Component {
    constructor() {
        super();
        ReactGA.pageview('moneeee-pageview');
    }

    render(props, state) {
        return <section>
            <article>
                <MoneeClock/>
            </article>
            <footer>
                <nav><small><code>Moneeee</code> is a simple joke app to know how much money you're making during a boring meeting or "agile" ceremony.</small></nav>
                <nav><small>It's still WIP, more features coming soon!</small></nav>
                <nav><small>Made with <a href="https://yegor256.github.io/tacit/">Tacit</a>, <a href="https://preactjs.com/">PREACT</a> and ❤️ by <a href="https://filfreire.com">Filipe Freire</a>, 2018</small></nav>
            </footer>
        </section>;
    }
}

class Currency extends Component {
    render(props, state) {
        let prefix = ["$", "USD"];

        if (prefix.indexOf(props.unit) >= 0) {
            return <span class="currency">{props.unit} {props.amount}</span>;
        }
        else {
            return <span class="currency">{props.amount} {props.unit}</span>;
        }
    }
}

class MoneeClock extends Component {
    constructor() {
        super();
        // TODO: improve this crappy code, and crappy input
        this.state.moneypersec = ((prompt("I make per month (20 work days, 8h a day)", 1500))/20)/8/60/60;
        this.state.currency = prompt("In this currency", "€");
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
        let currency = state.currency;
        return <div class="center">
            <h1>You've made<br/> <Currency unit={currency} amount={moneee} /> <br/>in a boring meeting.</h1>
            <h1>🎉</h1>
            </div>;
    }
}


function Seconds(start,newt) {
    return (newt - start)/ 1000;
}
function Moneee(seconds, moneypersec) {
    return Math.round(seconds * moneypersec * 100) / 100;
}

export default MainSection;
