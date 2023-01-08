import { Foundation, FontAwesome5 } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import { TouchableOpacity, View, Text, TextInputProps, TextInput } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import { styles } from './styles';

interface FieldProps extends TextInputProps {
  label: string
  children?: ReactNode
  icon?: JSX.Element
}


export function InputField({ onChangeText, value, label, children, secureTextEntry, placeholder, icon }: FieldProps) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: Colors[colorScheme].textContrast }]}>{label}</Text>
      <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].itemColor }]}>
        {icon}
        <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor, color: Colors[colorScheme].text }]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Colors.gray}
          cursorColor={Colors.primary}
        />
        {children}
      </View>
    </View>
  )
}

export function PasswordInput({ onChangeText, value, label }: FieldProps) {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <InputField label={label} onChangeText={onChangeText} value={value} secureTextEntry={hidePassword} placeholder="Sua senha"
      icon={<Foundation style={styles.icon} name={'lock'} size={20} />}
    >
      <TouchableOpacity onPress={() => {
        setHidePassword(!hidePassword)
      }} style={[styles.icon, { alignItems: 'center', width: 50 }]}>
        <FontAwesome5 name={hidePassword ? 'eye' : 'eye-slash'} size={20} />
      </TouchableOpacity>
    </InputField >
  )
}
// export function PasswordInput({ onChangeText, value, label }: FieldProps) {
//   const [hidePassword, setHidePassword] = useState(true)

//   return (
//     <View style={styles.field}>
//       <Text style={[styles.label, { color: Colors[colorScheme].textContrast }]}>{label}</Text>

//       <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].itemColor }]}>
//         <Foundation style={styles.icon} name={'lock'} size={20} />
//         <TextInput style={[styles.input, { backgroundColor: Colors[colorScheme].itemColor, color: Colors[colorScheme].text }]}
//           onChangeText={onChangeText}
//           value={value}
//           placeholder="Sua senha"
//           secureTextEntry={hidePassword}
//           placeholderTextColor={Colors.gray}
//           cursorColor={Colors.primary}
//         />
      //   <TouchableOpacity onPress={() => {
      //     setHidePassword(!hidePassword)
      //   }} style={[styles.icon, { alignItems: 'center', width: 50 }]}>
      //     <FontAwesome5 name={hidePassword ? 'eye' : 'eye-slash'} size={20} />
      //   </TouchableOpacity>
      // </View>
//     </View>
//   )
// }