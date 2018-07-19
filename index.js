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
                <nav><small>Pssst! It's open-source, you can contribute on <a href="https://github.com/filfreire/Moneeee">Github</a>!</small></nav>
            </footer>
        </section>;
    }
}

class Currency extends Component {
    render({unit, amount}) {
        return currencies[unit] === AFTER
            ? <span class="currency">{amount} {unit}</span>
            : <span class="currency">{unit} {amount}</span>;
    }
}

const [BEFORE, AFTER] = [0, 1];
const currencies = {
    '$': BEFORE,
    '€': AFTER,
    '¥': BEFORE,
    '₹': BEFORE,
    '£': BEFORE,
}
class Input extends Component {
    constructor() {
        super();
        this.state.permonth = 1500;
        this.state.weekduration = 40;
        this.state.currency = "$";
    }
    render({start}, {permonth, weekduration, currency}) {
        return <form>
            <label for="salary">
            Salary:
            <input id="salary" value={permonth} onInput={this.updateSalary}/>
            </label>
            <label for="weekduration">
            Hours per week:
            <input id="weekduration" value={weekduration} onInput={this.updateWeekDuration}/>
            </label>
            { Object.keys(currencies).map((c) =>
              <label><input type="radio" name="currency" value={c} onClick={this.updateCurrency} checked={c === currency}/>{c}</label>)
            }
            <button type="button" onClick={start.bind(null, permonth, weekduration, currency)}>Start</button>
            </form>;
   }
   updateSalary = (e) => {
       this.setState({permonth: Number(e.target.value)});
   }
   updateWeekDuration = (e) => {
       this.setState({weekduration: Number(e.target.value)});
   }
   updateCurrency = (e) => {
       this.setState({currency: e.target.value});
   }
}

class MoneeClock extends Component {
    constructor() {
        super();
        // TODO: improve this crappy code, and crappy input
        this.state.moneypersec = 0;
        this.state.currency = '';
        this.state.time = null;
        this.state.starttime = null;
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    startTimer = (permonth, weekduration, currency) => {
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
        this.setState({
            moneypersec: permonth / (weekduration / 7 * 20  * 3600), // assume 20 days/month
            currency: currency,
            starttime: Date.now(),
            time: Date.now()
        });
    }
    render(props, {starttime, time, currency, moneypersec}) {
        if (!starttime) {
            return <Input start={this.startTimer}/>
        } else {
            const moneee = Moneee(Seconds(starttime, time), moneypersec);
            return <div class="center">
                    <h1>You've made<br/> <Currency unit={currency} amount={moneee} /> <br/>in a boring meeting.</h1>
                    <h1>🎉</h1>
                </div>;
        }
    }
}


function Seconds(start,newt) {
    return (newt - start)/ 1000;
}
function Moneee(seconds, moneypersec) {
    return Math.round(seconds * moneypersec * 100) / 100;
}

export default MainSection;
