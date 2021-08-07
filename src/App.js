import React from 'react';
import { Formik, Field, Form } from 'formik';

const appStyle = {
  height: '100%',
  display: 'flex'
};

const formStyle = {

  margin: '10px',
  padding: '10px',
  border: '1px solid #c9c9c9',
  borderRadius: '5px',
  background: '#f5f5f5',
  width: '90%',
  display: 'block',
  height: '100%',
  //minHeight: '90vh',
  //height: '100%'


};

const labelStyle = {
  margin: '10px 0 5px 0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px',
};

const inputStyle = {
  margin: '5px 0 10px 0',
  padding: '5px',
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  boxSizing: 'border-box',
  width: '100%'
};

const submitStyle = {
  margin: '10px 0 0 0',
  padding: '7px 10px',
  border: '1px solid #efffff',
  borderRadius: '3px',
  background: '#3085d6',
  width: '100%',
  fontSize: '15px',
  color: 'white',
  display: 'block'
};

const responseStyle = {
  textAlign: 'center'
};



const UseFocus = () => {
  const htmlElRef = React.useRef(null)

  //const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  const setFocus = () => { }

  return [htmlElRef, setFocus]
}


const FieldBarcode_ = React.forwardRef((props, ref) => {
  return (
    <div>


      <label style={labelStyle} htmlFor="barcode">Barcode</label>
      <Field ref={ref} style={inputStyle} autoFocus id="barcode" name="barcode" placeholder="barcode" />

    </div>
  );
});


const App = () => {

  const url = 'https://virtserver.swaggerhub.com/elisru/ret-shop/1.0.0/scan';
  const [refBarcode, setFocus] = UseFocus();
  const [response, setResponse] = React.useState('');


  return (
    <div style={appStyle}>

      <Formik
        initialValues={{
          barcode: ''
        }}
        onSubmit={(values, { resetForm }) => {

          setResponse('');

          if (!values.barcode) {
            return;
          }
          console.log(values);

          document.getElementById("barcode").focus();
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                "job": "default",
                "barcodes": [values.barcode]
              }
            )
          })
            .then(res => res.json())
            .then(data => {
              // enter you logic when the fetch is successful
              resetForm({})
              console.log(data)
              setResponse(data[0].items[0].name);
            })
            .catch(error => {
              // enter your logic for when there is an error (ex. error toast)
              resetForm({})
              setResponse('');
              console.log(error)
            })
        }
        }

      >
        <Form style={formStyle}>

          <label style={labelStyle} htmlFor="barcode">Barcode</label>
          <Field  style={inputStyle} autocomplete="off" autoFocus id="barcode" name="barcode" placeholder="barcode" />
          <button style={submitStyle} type="submit">Submit</button>
          <h4 style={responseStyle}>{response}</h4>
        </Form>

      </Formik>



    </div>)
};

export default App;