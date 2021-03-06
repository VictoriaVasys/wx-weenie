import React, { useContext } from 'react';
import { Linking, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/WeatherConditions';
import { AppContext, styles } from '../MainContainer';

const Weather = () => {
  const data = useContext(AppContext);
  const id = data.weather && data.weather.current.id
  const location = data.location
  const codedObservation = data.codedObservation
  const description = data.nextForecastDescription
  const temperature = data.weather ? Math.round(data.weather.current.temperature * 10) / 10 : 'n/a'
  const weatherCondition = weatherConditions[id]

  return (
    <View style={styles.weatherContainer}>
      <View style={[styles.titleContainer, {marginBottom: 0}]}>
          <MaterialCommunityIcons
            size={96}
            name={weatherCondition ? weatherCondition.icon : weatherConditions.Clear.icon}
            color="#C1E9C0"
          />
        <View style={[styles.flexColumnContainer]}>
          <Text style={styles.locationText}>{location}</Text>
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
      </View>
      <Text style={[styles.subtitle, {marginBottom: 32}]}>{weatherCondition ? `${weatherCondition.title}... ${weatherCondition.subtitle}` : 'Weather data is currently unavailable'}</Text>
      <div style={{borderRadius: 16, overflowX: 'scroll'}}>
        <img
          id="spc-overview"
          alt="Storm Prediction Center products overview"
          src="https://www.spc.noaa.gov/products/activity_loop.gif"
          style={{width: '150%'}}
        />
      </div>
      <View style={styles.bodyContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.observation}>{codedObservation}</Text>
        <Text style={styles.link} onPress={ ()=> Linking.openURL('http://www.theweatherprediction.com/jargon/') } >Glossary of NWS Forecast Discussion Jargon</Text>
      </View>
    </View>
  );
};

export default Weather;