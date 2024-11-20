import {
  Block,
  BlockProps,
  Icon,
  Image,
  Modal,
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextProps,
} from 'components';
import React, {ReactElement, useEffect, useState} from 'react';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'theme';
import {searchIgnoreCaseAccent} from 'util/helper';

export type ItemSelectInput<V> = {
  value: V;
  label: string;
  icon?: string;
};

export type SelectInputProps<I, F extends FieldValues> = {
  labelInput?: string;
  labelPicker?: string;
  placeholder?: string;
  data: I[];
  haveSearch?: boolean;
  modalContainerProps?: BlockProps;
  inputProps?: PressableProps;
  isFullMode?: boolean;
  required?: boolean;
  onSelectItem?: (item: I) => void;
  renderCustomInput?: (props: {
    currentItem?: I;
    error?: FieldError;
    onPress: () => void;
  }) => ReactElement;
  labelInputProps?: TextProps;
  containerProps?: BlockProps;
  name: FieldPath<F>;
  control: Control<F>;
  disabled?: boolean;
};

export const SelectInput = <
  I extends ItemSelectInput<number | string>,
  F extends FieldValues,
>({
  labelInput = '',
  labelPicker,
  placeholder = '-- Select --',
  data = [],
  haveSearch,
  modalContainerProps,
  inputProps,
  isFullMode,
  required,
  renderCustomInput,
  onSelectItem,
  labelInputProps,
  containerProps,
  name,
  control,
  disabled,
}: SelectInputProps<I, F>) => {
  const {bottom, top} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const _isFullMode = isFullMode ?? data.length > 5;
  const {
    field: {onChange, onBlur, value: fValue},
    fieldState: {error},
  } = useController({name, control});
  const [currentItem, setItem] = useState<I>();

  useEffect(() => {
    if (fValue !== currentItem?.value) {
      const item = data.find(x => x.value === fValue);
      setItem(item);
    }
  }, [fValue, data.length]);

  const showModal = () => {
    if (data.length > 0) {
      setModalVisible(true);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setSearch('');
    onBlur();
  };

  const itemOnPress = (item: I) => {
    hideModal();
    setItem(item);
    onChange(item.value);
    onSelectItem?.(item);
  };

  const renderInput = () => {
    if (renderCustomInput) {
      return renderCustomInput({
        currentItem,
        error,
        onPress: showModal,
      });
    }
    const display = currentItem ? currentItem.label : placeholder;
    const isEmptyData = !(data?.length > 0);
    return (
      <Block {...containerProps}>
        {labelInput?.length > 0 && (
          <Text
            fontSize={16}
            font="medium"
            marginBottom={10}
            {...labelInputProps}>
            {labelInput}{' '}
            {required ? <Text color={COLORS.red}>{'*'}</Text> : null}
          </Text>
        )}
        <Pressable
          rowCenter
          disabled={isEmptyData || disabled}
          onPress={showModal}
          radius={5}
          height={45}
          paddingHorizontal={10}
          borderWidth={1}
          borderColor={COLORS.brightGray}
          backgroundColor={isEmptyData ? COLORS.antiFlashWhite : COLORS.white}
          {...inputProps}>
          <Text
            color={currentItem != null ? COLORS.black : COLORS.gray}
            fontSize={14}
            numberOfLines={1}
            flex>
            {display}
          </Text>
          <Icon
            type={'Entypo'}
            size={25}
            color={COLORS.gray}
            name="chevron-small-down"
          />
        </Pressable>
        {error?.message ? (
          <Text color="red" fontSize={14} marginTop={5}>
            {error.message}
          </Text>
        ) : null}
      </Block>
    );
  };

  const renderModalHeader = () => {
    return (
      <LinearGradient
        style={{
          borderTopLeftRadius: 10,
          marginBottom: 15,
          borderTopRightRadius: 10,
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[COLORS.primary, COLORS.primary]}>
        <Block
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          rowCenter
          justifyContent="space-between"
          paddingVertical={15}>
          <Block width={20} />
          <Text alignSelf="center" color="white" fontSize={17}>
            {labelPicker ?? labelInput}
          </Text>

          <Pressable alignSelf="flex-end" marginRight={10} onPress={hideModal}>
            <Icon type={'AntDesign'} name="closecircleo" color="white" />
          </Pressable>
        </Block>
      </LinearGradient>
    );
  };

  const renderModalSearch = () => {
    return (
      <Block
        marginHorizontal={10}
        rowCenter
        radius={5}
        borderWidth={1}
        borderColor={COLORS.brightGray}
        marginBottom={10}
        paddingHorizontal={15}
        backgroundColor={COLORS.white}>
        <Icon type={'AntDesign'} name="search1" />
        <TextInput
          flex
          value={search}
          fontSize={15}
          placeholderTextColor={COLORS.gray}
          onChangeText={setSearch}
          placeholder="Tìm kiếm"
          paddingLeft={5}
        />
      </Block>
    );
  };

  const renderListItem = () => {
    const trimmed = search.trim();
    const filtered = trimmed
      ? data.filter(d => searchIgnoreCaseAccent(d.label, trimmed))
      : data;
    return (
      <ScrollView>
        <Block backgroundColor={COLORS.white}>
          {filtered.map(x => {
            const selected = x.value === currentItem?.value;

            return (
              <Pressable
                radius={3}
                onPress={() => itemOnPress(x)}
                key={`${x.value}`}
                rowCenter
                marginBottom={5}
                padding={15}>
                {!!x?.icon && (
                  <Image
                    source={{uri: x?.icon}}
                    square={40}
                    resizeMode="contain"
                    marginRight={10}
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: COLORS.antiFlashWhite,
                    }}
                  />
                )}
                <Text
                  flex
                  fontSize={16}
                  color={selected ? COLORS.primary : COLORS.black}>
                  {x.label || ''}
                </Text>
                {selected && (
                  <Icon
                    type={'AntDesign'}
                    name="checkcircle"
                    color={COLORS.primary}
                  />
                )}
              </Pressable>
            );
          })}
        </Block>
      </ScrollView>
    );
  };

  const renderModal = () => {
    return (
      <Modal isVisible={true} position="bottom" setIsVisible={setModalVisible}>
        <Block
          flex={_isFullMode}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
          marginTop={_isFullMode ? top + 50 : 0}
          paddingBottom={_isFullMode ? bottom : bottom + 20}
          backgroundColor="white"
          {...modalContainerProps}>
          {renderModalHeader()}
          {(haveSearch ?? _isFullMode) && renderModalSearch()}
          {renderListItem()}
        </Block>
      </Modal>
    );
  };

  return (
    <>
      {renderInput()}
      {modalVisible && renderModal()}
    </>
  );
};
