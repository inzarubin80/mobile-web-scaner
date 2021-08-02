import React from 'react';
import { Formik, Field, Form } from 'formik';

const appStyle = {
  height: '250px',
  display: 'flex'
};

const formStyle = {
  margin: 'auto',
  padding: '10px',
  border: '1px solid #c9c9c9',
  borderRadius: '5px',
  background: '#f5f5f5',
  width: '90%',
  display: 'block'
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



const UseFocus = () => {
  const htmlElRef = React.useRef(null)

  //const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  const setFocus = () => { }

  return [htmlElRef, setFocus]
}






/*
const Form = ({ onSubmit, setBarcode, barcode }) => {

  return (
    <form style={formStyle} onSubmit={onSubmit} >
    
      <div>
      <label style={labelStyle} >{"Barcode:"}</label>
      <input autoFocus  type={"text"} value={barcode} style={inputStyle} onChange={(event) => setBarcode(event.target.value)} />
    </div>

      <div>
        
        <input type="submit" value="Отправить" />

      </div>
    </form>
  );
};
*/

// Usage example:




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

  return (
    <div style={appStyle}>

      <Formik
        initialValues={{
          barcode: ''
        }}
        onSubmit={(values) => {

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
              console.log(data)
            })
            .catch(error => {
              // enter your logic for when there is an error (ex. error toast)
              console.log(error)
            })
        }
        }

      >
        <Form style={formStyle}>

          <label style={labelStyle} htmlFor="barcode">Barcode</label>
          <Field style={inputStyle} autoFocus id="barcode" name="barcode" placeholder="barcode"/>
          <button style={submitStyle} type="submit">Submit</button>

        </Form>

      </Formik>
    </div>)
};

export default App;