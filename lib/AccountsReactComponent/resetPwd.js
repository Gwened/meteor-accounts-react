import React, { Component, Fragment } from 'react'
import { T9n } from 'meteor-accounts-t9n'
import BaseForm from './baseForm'
import { validateForm } from '../utils/'
import { getModel, redirect } from './commonUtils'
import { resetPassword } from './methods'

class ResetPwd extends Component {
  constructor () {
    super()
    this.state = {
      passwordUpdated: false,
      errors: []
    }

    this.getModel = getModel.bind(this)
    this.redirect = redirect.bind(this)
  }

  render () {
    const {
      currentState,
      defaults
    } = this.props

    const {
      translations,
      texts
    } = defaults

    const {
      passwordUpdated,
      errors
    } = this.state

    const model = this.getModel()

    return (
      <Fragment>

        <BaseForm
          context={this}
          currentState={currentState}
          values={model}
          defaults={defaults}
          onSubmit={this.onSubmit}
          errors={errors}
        />

        {passwordUpdated && <p>{texts.info.pwdSet || T9n.get(translations.info.pwdSet)}</p>}

      </Fragment>
    )
  }

  onSubmit = () => {
    // Validate form
    if (!validateForm(this.getModel(), this)) return

    const { password } = this.getModel()

    // Change password
    resetPassword(this.props.token, password, err => {
      if (err) {
        this.setState({ errors: [{ _id: '__globals', errStr: T9n.get(`error.accounts.${err.reason}`) }], passwordUpdated: false })
      } else {
        this.setState({ errors: [], passwordUpdated: true })
      }

      this.props.defaults.onSubmitHook(err, this.props.currentState)
    })
  }
}

export default ResetPwd
