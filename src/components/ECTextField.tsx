import React, {forwardRef, FunctionComponent, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Alert,
  ReturnKeyTypeOptions,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppTheme} from '../theme';
import {ECText} from './ECText';

interface ECTextFieldProps extends TextInputProps {
  ActionComponent?: React.ReactNode;
  primaryLabel?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  returnKeyLabel?: ReturnKeyTypeOptions;
  isRequired?: boolean;
  info?: boolean;
  primaryPlaceholder: string;
  error?: string;
}

const deviceHeight = Dimensions.get('screen').height;

export const ECTextField = forwardRef<TextInput, ECTextFieldProps>(
  (props, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const currentInputRef = useRef('');
    const {
      primaryLabel,
      returnKeyType = 'next',
      returnKeyLabel = 'next',
      ActionComponent,
      info,
      primaryPlaceholder,
      error,
      onFocus,
      onBlur,
    } = props;

    const {
      colors: {
        primaryInputLabel,
        errorBorderInputField,
        errorInputText,
        focusedInputField,
        unFocusedInputField,
        primaryTextColor,
        placeholderTextColor,
        selectionCursorColor,
      },
    } = useAppTheme();

    const paddingRight = ActionComponent ? 70 : 16;

    return (
      <View>
        <View style={styles.labelContainer}>
          <View style={styles.primaryLabel}>
            <ECText
              fontSize={14}
              textColor={error ? errorInputText : primaryInputLabel}>
              {primaryLabel}
            </ECText>
            {info ? (
              <ECTextFieldInfo
                color={error ? errorInputText : primaryInputLabel}
              />
            ) : null}
          </View>
        </View>
        <View>
          <TextInput
            placeholder={primaryPlaceholder}
            placeholderTextColor={placeholderTextColor}
            selectionColor={selectionCursorColor}
            style={[
              styles.input,
              {
                borderColor: error
                  ? errorBorderInputField
                  : isFocused
                  ? focusedInputField
                  : unFocusedInputField,
                paddingRight,
                color: primaryTextColor,
              },
            ]}
            returnKeyLabel={returnKeyLabel}
            returnKeyType={returnKeyType}
            ref={ref}
            blurOnSubmit={false}
            autoCapitalize="none"
            {...props}
            onChangeText={text => {
              currentInputRef.current = text;
              props.onChangeText?.(text);
            }}
            onFocus={e => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              onBlur?.(e);
            }}
          />
          {ActionComponent ? (
            <View style={styles.iconWrapper}>{ActionComponent}</View>
          ) : null}
          {error ? (
            <ECText
              style={styles.error}
              fontSize={11}
              textColor={errorInputText}>
              {error}
            </ECText>
          ) : null}
        </View>
      </View>
    );
  },
);

interface ECTextFieldInfoProps {
  color: string;
}

export const ECTextFieldInfo: FunctionComponent<ECTextFieldInfoProps> = ({
  color,
}) => {
  const {t} = useTranslation('account');
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          t('passwordRequirements'),
          `${t('8characters')}\n${t('oneLowerCase')}\n${t('oneUpperCase')}\n${t(
            'numberOrSpecialCahracter',
          )}`,
        );
      }}>
      <Ionicons name="information-circle-outline" color={color} size={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    height: deviceHeight < 700 ? 45 : 56,
    fontSize: 18,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 7,
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 18,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 50,
  },
  primaryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    lineHeight: 18,
    position: 'absolute',
    top: '100%',
  },
});
