import React, { useState } from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import api from '../../service/axios'

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText
} from './styles'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleCreateAccountPress = () => {
    navigation.navigate('SignUp')
  }

  const handleSignInPress = () => {
    if (!email || !password) {
      setError('Please enter a valid email or password')
    }
    api
      .post('/login', { email, password })
      .then(({ data }) => {
        AsyncStorage.setItem('@airbnbapp:token', data.token)
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Main' })]
        })
        navigation.dispatch(resetAction)
      })
      .catch(() => {
        setError('There was an auth error')
      })
  }

  return (
    <Container>
      <StatusBar hidden />
      <Logo
        source={require('../../images/airbnb_logo.png')}
        resizeMode="contain"
      />
      <Input
        placeholder="Endereço de e-mail"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={handlePasswordChange}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
      <Button onPress={handleSignInPress}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <SignUpLink onPress={handleCreateAccountPress}>
        <SignUpLinkText>Criar conta grátis</SignUpLinkText>
      </SignUpLink>
    </Container>
  )
}
