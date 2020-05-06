import {SendGridEmailProvider} from "../providers/data/SendGridEmailProvider";
import {Configurations} from "../_configuration";

export default class EmailService {

  /**
   * @param {string} toEmail Recipient of email.
   */
  constructor(toEmail) {
    this.emailProvider = new SendGridEmailProvider(Configurations.email.api_key);
    this.__toEmail = toEmail;
  }

  /**
   * Email to recipient.
   *
   * @param {string} toEmail Recipient of email.
   *
   * @returns {EmailService} Email service.
   */
  static to(toEmail) {
    return new EmailService(toEmail);
  }

  /**
   * Send email through email provider.
   *
   * @param {string} templateID Template ID
   * @param {object} templateData Template data.
   *
   * @returns {Promise<boolean>} Email response.
   * @async
   * @private
   */
  async __sendEmail(templateID, templateData) {
    const fromEmail = Configurations.email.from_email;

    /** @type {{statusCode: number}[]} */
    const emailResponse = await this.emailProvider.sendEmailWithTemplate(templateID, this.__toEmail, fromEmail, templateData);

    return emailResponse[0].statusCode === 202;
  }

  /**
   * Send test email.
   *
   * @param {string} templateID Template test ID.
   *
   * @returns {Promise<boolean>} Email response.
   * @async
   */
  async sendTestEmail(templateID) {
    return this.__sendEmail(templateID, {TEST: "Yes"});
  }

  /**
   * Send email to change user email.
   *
   * @param {string} userName User name.
   * @param {string} postValidationLink Link to post validation email.
   */
  async sendEmailChangedEmail(userName, postValidationLink) {
    const data = {
      USER_NAME: userName,
      POST_VALIDATION_LINK: postValidationLink
    };

    await this.__sendEmail(Configurations.email.template_ids.EmailChanged, data);
  }

  /**
   * Send email to when password has been changed.
   *
   * @param {string} userName User name.
   */
  async sendPasswordChangedEmail(userName) {
    const data = {
      USER_NAME: userName,
    };

    await this.__sendEmail(Configurations.email.template_ids.PasswordChanged, data);
  }

  /**
   * Send email when node was created or imported.
   *
   * @param {string} action The action taken(imported or created).
   * @param {string} userName User name.
   * @param {{name: string, link: string}} nodeData Node data.
   */
  async sendCreateOrImportNodeEmail(action, userName, nodeData) {
    const data = {
      ACTION: action,
      USER_NAME: userName,
      NODE_NAME: nodeData.name,
      NODE_LINK: nodeData.link
    };

    await this.__sendEmail(Configurations.email.template_ids.CreateOrImportNode, data);
  }

  /**
   * Send email when node was deleted.
   *
   * @param {string} userName User name.
   * @param {{name: string, nodesLink: string}} nodeData Node data.
   */
  async sendNodeDeletedEmail(userName, nodeData) {
    const data = {
      USER_NAME: userName,
      NODE_NAME: nodeData.name,
      NODES_LINK: nodeData.nodesLink
    };

    await this.__sendEmail(Configurations.email.template_ids.NodeDeleted, data);
  }

  /**
   * Send email when node was out of jail.
   *
   * @param {string} userName User name.
   * @param {{name: string, nodeLink: string}} nodeData Node data.
   */
  async sendNodeUnJailedEmail(userName, nodeData) {
    const data = {
      USER_NAME: userName,
      NODE_NAME: nodeData.name,
      NODE_LINK: nodeData.nodeLink
    };

    await this.__sendEmail(Configurations.email.template_ids.NodeUnJailed, data);
  }

  /**
   * Send email when node was staked.
   *
   * @param {string} userName User name.
   * @param {{name: string, link: string}} nodeData Node data.
   * @param {{amountPaid: string, validatorPower: string, poktStaked: string}} paymentData Payment data.
   */
  async sendStakeNodeEmail(userName, nodeData, paymentData) {
    const data = {
      USER_NAME: userName,
      NODE_NAME: nodeData.name,
      NODE_LINK: nodeData.link,
      PAY_AMOUNT: paymentData.amountPaid,
      VALIDATOR_POWER: paymentData.validatorPower,
      POKT_STAKED: paymentData.poktStaked
    };

    await this.__sendEmail(Configurations.email.template_ids.StakeNode, data);
  }

  /**
   * Send email when node was unstaked.
   *
   * @param {string} userName User name.
   * @param {{name: string, link: string}} nodeData Node data.
   */
  async sendUnstakeNodeEmail(userName, nodeData) {
    const data = {
      USER_NAME: userName,
      NODE_NAME: nodeData.name,
      NODE_LINK: nodeData.link
    };

    await this.__sendEmail(Configurations.email.template_ids.UnstakeNode, data);
  }

  /**
   * Send email when application was created or imported.
   *
   * @param {string} action The action taken(imported or created).
   * @param {string} userName User name.
   * @param {{name: string, link: string}} applicationData Application data.
   */
  async sendCreateOrImportAppEmail(action, userName, applicationData) {
    const data = {
      ACTION: action,
      USER_NAME: userName,
      APP_NAME: applicationData.name,
      APP_LINK: applicationData.link
    };

    await this.__sendEmail(Configurations.email.template_ids.CreateOrImportApp, data);
  }

  /**
   * Send email when application was deleted.
   *
   * @param {string} userName User name.
   * @param {{name: string, appsLink: string}} applicationData Application data.
   */
  async sendAppDeletedEmail(userName, applicationData) {
    const data = {
      USER_NAME: userName,
      APP_NAME: applicationData.name,
      APPS_LINK: applicationData.appsLink
    };

    await this.__sendEmail(Configurations.email.template_ids.AppDeleted, data);
  }

  /**
   * Send email when application was staked.
   *
   * @param {string} userName User name.
   * @param {{name: string, link: string}} applicationData Application data.
   * @param {{amountPaid: string, maxRelayPerDayAmount: string, poktStaked: string}} paymentData Payment data.
   */
  async sendStakeAppEmail(userName, applicationData, paymentData) {
    const data = {
      USER_NAME: userName,
      APP_NAME: applicationData.name,
      APP_LINK: applicationData.link,
      PAY_AMOUNT: paymentData.amountPaid,
      MAX_RELAYS_PER_DAY_AMOUNT: paymentData.maxRelayPerDayAmount,
      POKT_STAKED: paymentData.poktStaked
    };

    await this.__sendEmail(Configurations.email.template_ids.StakeApp, data);
  }

  /**
   * Send email when application was unstaked.
   *
   * @param {string} userName User name.
   * @param {{name: string, link: string}} applicationData Application data.
   */
  async sendUnstakeAppEmail(userName, applicationData) {
    const data = {
      USER_NAME: userName,
      APP_NAME: applicationData.name,
      APP_LINK: applicationData.link
    };

    await this.__sendEmail(Configurations.email.template_ids.UnstakeNode, data);
  }

  /**
   * Send email when payment was declined.
   *
   * @param {string} userName User name.
   * @param {string} userPaymentMethodLink User payment method link.
   * @param {{amountPaid: string}} paymentData Payment data.
   */
  async sendPaymentDeclinedEmail(userName, userPaymentMethodLink, paymentData) {
    const data = {
      USER_NAME: userName,
      USER_PAYMENT_METHOD_LINK: userPaymentMethodLink,
      PAY_AMOUNT: paymentData.amountPaid
    };

    await this.__sendEmail(Configurations.email.template_ids.PaymentDeclined, data);
  }

}
