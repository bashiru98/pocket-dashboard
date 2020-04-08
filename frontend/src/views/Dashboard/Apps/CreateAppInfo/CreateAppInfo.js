import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Button, Col, Row, Form} from "react-bootstrap";
import ImageFileUpload from "../../../../core/components/ImageFileUpload/ImageFileUpload";
import Identicon from "identicon.js";
import ApplicationService from "../../../../core/services/PocketApplicationService";
import UserService from "../../../../core/services/PocketUserService";
import {DASHBOARD_PATHS, _getDashboardPath} from "../../../../_routes";
import "./CreateAppInfo.scss";

class CreateAppInfo extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleCreate = this.handleCreate.bind(this);

    this.state = {
      data: {
        name: "",
        owner: "",
        url: "",
        contactEmail: "",
        description: "",
      },
      icon: "",
      applicationData: {},
      created: false,
    };
  }

  async handleDrop(img) {
    // Fetch image blob data and converts it to base64
    const blob = await fetch(img).then((r) => r.blob());

    const reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onloadend = () => {
      const base64data = reader.result;

      this.setState({icon: base64data});
    };
  }

  handleChange({currentTarget: input}) {
    const data = {...this.state.data};

    data[input.name] = input.value;
    this.setState({data});
  }

  async handleCreate(e) {
    e.preventDefault();

    const {name, owner, url, contactEmail, description} = this.state.data;
    let {icon} = this.state;

    // TODO: Show proper message on front end to user on validation error
    if (name === "" || contactEmail === "" || owner === "") {
      console.log("missing required field");
    }

    const currTime = new Date().getTime();

    // Use current time as a 'hash' to generate icon of 250x250
    const identicon = `data:image/png;base64,${new Identicon(
      `${currTime}${currTime / 2}`, 250
    ).toString()}`;

    if (!icon) {
      icon = identicon;
    }

    const user = UserService.getUserInfo().email;

    const {success, data} = await ApplicationService.createApplication(
      name, owner, url, contactEmail, description, icon, user
    );

    if (success) {
      const {privateApplicationData, networkData} = data;
      const applicationData = {
        address: privateApplicationData.address,
        privateKey: privateApplicationData.privateKey,
        stakedTokens: networkData.staked_tokens,
        maxRelays: networkData.max_relays,
        status: networkData.status,
        jailed: networkData.jailed,
      };

      this.setState({applicationData, created: true});
    } else {
      // TODO: Show proper error message on front-end.
      console.log(data.response.data.message);
    }
  }

  state = {};
  render() {
    const {name, owner, url, contactEmail, description} = this.state.data;
    const {created, applicationData} = this.state;

    if (created) {
      return (
        <Redirect
          to={{
            pathname:_getDashboardPath(DASHBOARD_PATHS.appCreated),
            state: {applicationData},
          }}
        />
      );
    }

    return (
      <div id="create-app-info">
        <Row>
          <Col sm="3" md="3" lg="3">
            <h1>App Information</h1>
            <p>The fields with (*) are required to continue</p>
          </Col>
        </Row>
        <Row>
          <Col sm="3" md="3" lg="3">
            <ImageFileUpload
              handleDrop={(img) => this.handleDrop(img.preview)}
            />
          </Col>
          <Col sm="9" md="9" lg="9">
            <Form onSubmit={this.handleCreate}>
              <Form.Group>
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Application Developer*</Form.Label>
                <Form.Control
                  name="owner"
                  value={owner}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control
                  name="url"
                  value={url}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact email*</Form.Label>
                <Form.Control
                  name="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="6"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <div className="legal-info">
                <p>
                  - Purchasers are not buying POKT as an investment with the
                  expectation of profit or appreciation - Purcharsers are buying
                  POKT to use it.
                </p>
                <p>
                  - To ensure purchasers are bona fide and not investors, the
                  Company has set a purchase maximun per user and requires users
                  must hold POKT for 4 weeks and use (bond and stake) it before
                  transferring to another wallet or selling.
                </p>
                <p>
                  - Purchasers are acquiring POKT for their own account and use,
                  and not with an intention to re-sell or distribute POKT to
                  others.
                </p>
              </div>

              <div className="submit float-right mt-2">
                <Button variant="dark" size="lg" type="submit">
                  Continue
                </Button>
                <p>
                  By continuing you agree to Pocket&apos;s <br />
                  {/*TODO: Add terms and conditions link*/}
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                  <a className="link" href="#">Terms and conditions</a>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateAppInfo;