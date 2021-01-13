import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import colors from './src/utils/colors';
import ResultCalculation from './src/components/ResultCalculation';

export default function App() {
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonCalculate, setButtonCalculate] = useState(false);

  useEffect(() => {
    if (!capital && !interest && !months) {
      setButtonCalculate(false);
      reset();
    } else if (capital || interest || months) {
      calculate();
    }
  }, [capital, interest, months]);

  useEffect(() => {
    calculate();
  }, [buttonCalculate]);

  const calculate = () => {
    console.log(`Estado al hacer click ${buttonCalculate}`);
    if (buttonCalculate) {
      reset();
      if (!capital) {
        setErrorMessage('Añade la cantidad que quieres solicitar');
      } else if (!interest) {
        setErrorMessage('Añade el interés del prestamo');
      } else if (!months) {
        setErrorMessage('Selecciona lo meses a pagar');
      } else {
        const i = interest / 100;
        const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
        setTotal({
          monthlyFee: fee.toFixed(2).replace('.', ','),
          totalPayable: (fee * months).toFixed(2).replace('.', ','),
        });
      }
    }
  };

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };

  console.log(`Estado inicial ${buttonCalculate}`);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Préstamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <ResultCalculation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}
      />

      <Footer
        calculate={calculate}
        setButtonCalculate={setButtonCalculate}
        buttonCalculate={buttonCalculate}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#25283D',
    marginTop: 15,
  },
});
