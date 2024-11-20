import {
  Block,
  BlockProps,
  Icon,
  Modal,
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextProps,
} from 'components';
import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, COLORS_GRADIENT} from 'theme';
import {searchIgnoreCaseAccent} from 'util/helper';

type Item<V> = {
  value: V;
  label: string;
};

export type PickerProps<V, I> = {
  labelInput?: string;
  labelPicker?: string;
  placeholder?: string;
  data: I[];
  haveSearch?: boolean;
  modalContainerProps?: BlockProps;
  inputProps?: PressableProps;
  isFullMode?: boolean;
  required?: boolean;
  renderCustomInput?: (props: {
    currentItem?: I;
    onPress: () => void;
    setItem: (item: I | undefined) => void;
  }) => ReactElement;
  labelInputProps?: TextProps;
  containerProps?: BlockProps;
  value?: V;
  onValueChange?: (value: V) => void;
};

export const Picker = <V extends number | string, I extends Item<V>>({
  labelInput = '',
  labelPicker = '',
  placeholder = '-- Select --',
  data = [],
  haveSearch,
  modalContainerProps,
  inputProps,
  isFullMode,
  required,
  renderCustomInput,
  labelInputProps,
  containerProps,
  value,
  onValueChange,
}: PickerProps<V, I>) => {
  const {bottom, top} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const _isFullMode = isFullMode ?? data.length > 5;
  const [currentItem, setItem] = useState<I>();

  useEffect(() => {
    if (value !== undefined && value !== currentItem?.value) {
      const item = data.find(x => x.value === value);
      setItem(item);
    }
  }, [value, data.length]);

  const showModal = () => {
    if (data.length > 0) {
      setModalVisible(true);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    setSearch('');
  };

  const itemOnPress = (item: I) => {
    hideModal();
    if (currentItem?.value === item.value) {
      setItem(undefined);
    } else {
      setItem(item);
    }
    onValueChange?.(item.value);
  };

  const renderInput = () => {
    if (renderCustomInput) {
      return renderCustomInput({
        currentItem,
        onPress: showModal,
        setItem,
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
            {required ? <Text color={COLORS.brightGray}>{'*'}</Text> : null}
          </Text>
        )}
        <Pressable
          rowCenter
          disabled={isEmptyData}
          onPress={showModal}
          radius={7}
          height={45}
          paddingHorizontal={10}
          borderWidth={1}
          borderColor={COLORS.gray}
          backgroundColor={isEmptyData ? COLORS.brightGray : COLORS.white}
          {...inputProps}>
          <Text
            color={currentItem != null ? COLORS.denim : COLORS.catalinaBlue}
            fontSize={14}
            numberOfLines={1}
            flex>
            {display}
          </Text>
          <Icon
            type={'Entypo'}
            size={25}
            color={COLORS.catalinaBlue}
            name="chevron-small-down"
          />
        </Pressable>
      </Block>
    );
  };

  const renderModalHeader = () => {
    return (
      <Block
        backgroundColor={COLORS.primary}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <Block
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          rowCenter
          justifyContent="space-between"
          paddingVertical={15}>
          <Block width={20} />
          <Text alignSelf="center" color="white" fontSize={17}>
            {labelPicker}
          </Text>

          <Pressable alignSelf="flex-end" marginRight={10} onPress={hideModal}>
            <Icon type={'AntDesign'} name="closecircleo" color="white" />
          </Pressable>
        </Block>
      </Block>
    );
  };

  const renderModalSearch = () => {
    return (
      <Block
        marginHorizontal={10}
        rowCenter
        radius={5}
        marginBottom={10}
        paddingHorizontal={15}
        backgroundColor={COLORS.white}>
        <Icon type={'AntDesign'} name="search1" />
        <TextInput
          flex
          value={search}
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
                <Text
                  flex
                  fontSize={16}
                  color={selected ? COLORS.primary : COLORS.denim}>
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
