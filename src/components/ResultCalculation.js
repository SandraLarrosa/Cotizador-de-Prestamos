import React from 'react';
import {ScrollView, StyleSheet, Text, View, VisualViewport} from 'react-native';
import colors from '../utils/colors';

export default function ResultCalculation(props) {
  const {capital, interest, months, total, errorMessage} = props;

  return (
    <ScrollView style={styles.content}>
      {total && (
        <View style={styles.boxResult}>
          <Text style={styles.title}>RESUMEN</Text>
          <DataResult title="Cantidad Solicitada:" value={`${capital} €`} />
          <DataResult title="Interes %:" value={`${interest} %`} />
          <DataResult title="Plazos:" value={`${months} `} />
          <DataResult title="Pago mensual:" value={`${total.monthlyFee} € `} />
          <DataResult
            title="Total a pagar:"
            value={`${total.totalPayable} € `}
          />
        </View>
      )}
      <View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </ScrollView>
  );
}

function DataResult(props) {
  const {title, value} = props;

  return (
    <View style={styles.value}>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueResults}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  error: {
    textAlign: 'center',
    color: '#25283D',
    fontWeight: 'bold',
    fontSize: 20,
  },
  boxResult: {
    padding: 30,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#25283D',
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueResults: {
    fontSize: 16,
    color: '#25283D',
  },
});
