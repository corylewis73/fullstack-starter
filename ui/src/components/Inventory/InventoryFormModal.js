import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
      const {
        formName,
        handleDialog,
        handleInventory,
        title,
        initialValues,
        products,
        units
      } = this.props

  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }
    if (!values.productType) {
      errors.name = 'Required'
    }
    if (!values.unitOfMeasurement) {
      errors.name = 'Required'
    }

    return errors
  }

      return (
        <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
        >
          <Formik
            validate={validate}
            initialValues={initialValues}
            onSubmit={values => {
              values.bestBeforeDate = values.bestBeforeDate + 'T12:00:00Z'
              handleInventory(values)
              handleDialog(true)
            }}>
            {helpers =>
              <Form
              autoComplete='off'
              id={formName}
              >
                <DialogTitle id='alert-dialog-title'>
                  {`${title} Inventory`}
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <Grid item xs={12} sm={12}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='name'
                        label='Name'
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label for='productType'> Product Type: </label>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='productType'
                        id='productType'
                        type='text'
                        component='select'>
                        <option productType=''></option>
                        {products
                          .map(p => {
                            return(<option productType={p.name}>{p.name}</option>)
                          })
                        }
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='description'
                        label='Description'
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label for='averagePrice'> Average Price: </label>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='averagePrice'
                        id='averagePrice'
                        label='Average Price'
                        type='number'
                        component='input'>
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label for='unitOfMeasurement'> Unit of measurement: </label>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='unitOfMeasurement'
                        id='unitOfMeasurement'
                        component='select'>
                        <option unitOfMeasurement=''></option>
                        {units
                          .map(u => {return(<option unitOfMeasurement={u}>{u}</option>)})}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label for='bestBeforeDate'> Best Before Date: </label>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}                        
                        name='bestBeforeDate'
                        id='bestBeforeDate'
                        type='date'
                        component='input'>
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label for='neverExpires'> Never Expires: </label>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='neverExpires'
                        id='neverExpires'
                        type='checkbox'
                        component='input'>
                      </Field>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                  <Button
                    disableElevation
                    variant='contained'
                    type='submit'
                    form={formName}
                    color='secondary'
                    disabled={!helpers.dirty}>
                    Save
                  </Button>
                </DialogActions>
              </Form>
            }
          </Formik>
        </Dialog>
      )
    }
  }

export default InventoryFormModal