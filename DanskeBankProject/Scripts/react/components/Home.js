var React = require('react');
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from 'react-bootstrap-dialog'

import axios from 'axios';

import Header from './Header';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            person1: "",
            person2: "",
            facility1: "",
            facility2: "",
            exposure: "",
            answer: 0
        }
        this.loadPersonInfo = this.loadPersonInfo.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
        this.onSubmit = this.showOverlay.bind(this);
    }
   
    render() {
        return (
            <div onClick={this.hideOverlay}>
                <div id="myOverlay" class="overlay">

                    <div class="overlayText">
                        answer: {this.state.answer}
                    </div>
                    <Button variant="contained" onClick={this.hideOverlay}>
                        Close
                        </Button>
                </div>
                <div class="particles-login">
                    <div>
                        <React.Fragment>
                            
                            <CssBaseline />
                            <Container className="login-body" maxWidth="sm">
                                <header className="login-header">
                                    <a class="danskeImageAlign">
                                        <img src="https://kreditai.info/images/kreditoriai/bankai/Danske_Bank.png" alt="logo" />
                                    </a>
                                </header>
                                <nav>
                                    <Header />
                                </nav>
                                <Typography className="login-type-typography" component="div" style={{ backgroundColor: '#fff' }}>
                                    
                                    <TextField
                                        value={this.state.text}
                                        onChange={e => this.setState({ text: e.target.value })}
                                        style={{ margin: 8 }}
                                        className="textField"
                                        placeholder="Enter text"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />


                                    <Button variant="contained" disabled={this.state.text.length > 10} onClick={this.loadPersonInfo}>
                                            Submit text
                                        </Button>
                                        <Dialog ref={(el) => { this.dialog = el }} />
                                    

                                    <div class="dbRequestAnswer">
                                        <p class="paragraphName">People</p><br/>
                                        <p class="textFieldRequestName">person1  </p>
                                        <div class="textFieldRequestValue">
                                            <TextField
                                            value={this.state.person1}
                                                onChange={e => this.setState({ person1: e.target.value })}
                                            style={{ margin: 8 }}
                                            className="textField"
                                            placeholder="Enter text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            />
                                        </div>
                                        <p class="textFieldRequestName">person2  </p>
                                        <div class="textFieldRequestValue">
                                        <TextField
                                            value={this.state.person2}
                                                onChange={e => this.setState({ person2: e.target.value })}
                                            id="login-username-field"
                                            style={{ margin: 8 }}
                                            className="textField"
                                            placeholder="Enter text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            />
                                        </div>
                                    </div>
                                    <div class="dbRequestAnswer">
                                        <p class="paragraphName">Facility</p>
                                        <p class="textFieldRequestName">facility1  </p>
                                        <div class="textFieldRequestValue">
                                            <TextField
                                                value={this.state.facility1}
                                                onChange={e => this.setState({ facility1: e.target.value })}
                                                id="login-username-field"
                                                style={{ margin: 8 }}
                                                className="textField"
                                                placeholder="Enter text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        <p class="textFieldRequestName">facility2  </p>
                                        <div class="textFieldRequestValue">
                                            <TextField
                                                value={this.state.facility2}
                                                onChange={e => this.setState({ facility2: e.target.value })}
                                                id="login-username-field"
                                                style={{ margin: 8 }}
                                                className="textField"
                                                placeholder="Enter text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="dbRequestAnswer">
                                        <p class="paragraphName">Exposures</p>
                                        <p class="textFieldRequestName">exposure</p>
                                        <div class="textFieldRequestValue">
                                            <TextField
                                                value={this.state.exposure}
                                                onChange={e => this.setState({ exposure: e.target.value })}
                                                id="login-username-field"
                                                style={{ margin: 8 }}
                                                className="textField"
                                                placeholder="Enter text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                    </div>

                                </Typography>
                            </Container>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }
    async loadPersonInfo() {
        var personDataRequest = 'http://localhost:3000/users/?=' + this.state.text;
        var personsData = await axios.get(personDataRequest).then((res) => {
            return res.data;
        });
        var facilityRequestText = 'http://localhost:3000/facility/?=' + personsData.person1;
        var facilitiesData = await axios.get(facilityRequestText).then((res1) => {
            return res1.data;
        });
        var requestText2 = 'http://localhost:3000/exposure/?=' + facilitiesData.facility2;
        var exposureData = await axios.get(requestText2).then((res2) => {
            return res2.data;
        });
        this.setState({ answer: exposureData.exposure * facilitiesData.facility2 });
        this.setState({ person1: personsData.person1});
        this.setState({ person2: personsData.person2});
        this.setState({ facility1: facilitiesData.facility1});
        this.setState({ facility2: facilitiesData.facility2 });
        this.setState({ exposure: exposureData.exposure });
        document.getElementById("myOverlay").style.width = "100%";
    }
    
    onSubmit() {
        this.dialog.show({
            title: 'Greedings',
            body: 'How are you?',
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction()
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide()
                console.log('closed by clicking background.')
            }
        })
    }
    showOverlay() {
        window.onload = function () {
            document.getElementById("myOverlay").style.width = "100%";
        }
    }
    hideOverlay() {
            document.getElementById("myOverlay").style.width = "0";
    }


    
}