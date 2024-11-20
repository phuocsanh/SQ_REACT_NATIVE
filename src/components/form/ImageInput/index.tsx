import {ICONS} from 'assets';
import {
  Block,
  BlockProps,
  Icon,
  Image,
  ImagePicker,
  ImageProps,
  PickerImage,
  Pressable,
  PressableProps,
  Text,
} from 'components';
import React, {useState} from 'react';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
import {ActivityIndicator, Alert, Keyboard} from 'react-native';
import {CommonOptions, Options} from 'react-native-image-crop-picker';
// import {useUpdatePicture} from 'redux/other/apiHook';
import {COLORS} from 'theme';
import {Image as ImageCompressor} from 'react-native-compressor';

type ImageInputProps<F extends FieldValues> = {
  label?: string;
  require?: boolean;
  placeholderTitle?: string;
  name: FieldPath<F>;
  control: Control<F>;
  options?: CommonOptions &
    Partial<Extract<Options, {mediaType: 'photo'}>> & {multiple?: false};
  containerProps?: BlockProps;
  placeholderProps?: PressableProps;
  imagePreviewProps?: ImageProps;
  placeholderSize?: number;
  disabled?: boolean;
  disableCamera?: boolean;
  disableGallery?: boolean;
  /**
   * Max image size in MB
   * 0 = unlimited size
   * @default 5MB
   */
  maxSize?: number;
  uploadOnPick?: boolean;
};

export const ImageInput = <F extends FieldValues>({
  label,
  placeholderTitle = 'Chọn hình ảnh',
  name,
  control,
  options,
  require,
  containerProps,
  placeholderSize = 177,
  placeholderProps,
  disabled = false,
  imagePreviewProps,
  maxSize = 5,
  uploadOnPick,
  disableCamera = false,
  disableGallery = false,
}: ImageInputProps<F>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempImg, setTempImg] = useState<PickerImage>();
  // const {request, isLoading} = useUpdatePicture();
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  const image = value as PickerImage | string | undefined;

  const uploadImage = async (img: PickerImage) => {
    try {
      setTempImg(img);
      const result = await ImageCompressor.compress(img.path);
      // const res = await request({
      //   file_attach: {uri: result, name: `picture_${Date.now()}.jpg`, type: img.mime},
      // });
      let res;
      if (res.data && 'file_attach' in res.data) {
        onChange(res.data.file_attach[0]);
      } else {
        setTempImg(undefined);
        // TODO replace with custom toast
        Alert.alert(res.data?.error[0].detail || 'upload lỗi');
      }
    } catch (err) {
      // TODO replace with custom toast
      Alert.alert('upload hình lỗi');
      setTempImg(undefined);
    }
  };

  const onImagePick = async (img: PickerImage) => {
    if (maxSize && img.size > maxSize * 1048576) {
      // TODO replace with custom toast
      Alert.alert(
        'Kích thước hình ảnh không phù hợp!',
        `Vui lòng chọn hình ảnh có dung lượng không vượt quá ${maxSize} MB`,
      );
    } else if (uploadOnPick) {
      uploadImage(img);
    } else {
      onChange(img);
    }
  };

  const onClearImage = () => {
    onChange(undefined);
    setTempImg(undefined);
  };

  const renderPlaceHolder = () => {
    return (
      <Pressable
        disabled={disabled}
        square={placeholderSize}
        onPress={() => {
          Keyboard.dismiss();
          setModalVisible(true);
        }}
        borderStyle="dashed"
        borderWidth={1}
        borderColor={COLORS.primary}
        backgroundColor={COLORS.lightCyan}
        contentCenter
        radius={10}
        {...placeholderProps}>
        <Image
          source={ICONS.ic_upload_image}
          square={placeholderSize / 3}
          resizeMode="cover"
        />
        {placeholderTitle ? (
          <Text fontSize={16} marginTop={15}>
            {placeholderTitle}
          </Text>
        ) : null}
      </Pressable>
    );
  };

  const renderImagePreview = () => {
    return (
      <Image
        source={{
          uri: tempImg
            ? tempImg.path
            : typeof image === 'string'
            ? image
            : image!.path,
        }}
        resizeMode="cover"
        alignSelf="stretch"
        height={placeholderSize}
        {...imagePreviewProps}>
        {!disabled && (
          <Pressable
            position="absolute"
            right={5}
            top={5}
            onPress={onClearImage}
            backgroundColor={COLORS.white}
            radius={20}>
            <Icon
              type="AntDesign"
              name="closecircle"
              size={20}
              color={COLORS.backgroundIcon}
            />
          </Pressable>
        )}
        {isLoading && (
          <Block
            backgroundColor={'rgba(0,0,0,0.5)'}
            absoluteFillObject
            contentCenter>
            <ActivityIndicator size="small" color={COLORS.white} />
          </Block>
        )}
      </Image>
    );
  };

  return (
    <Block {...containerProps}>
      {label ? (
        <Text fontSize={16} font="semiBold" marginBottom={10}>
          {label} {require && <Text color={COLORS.red}>*</Text>}
        </Text>
      ) : null}
      {image || tempImg ? renderImagePreview() : renderPlaceHolder()}
      {error?.message ? (
        <Text color={COLORS.red} fontSize={14} marginTop={8}>
          {error.message}
        </Text>
      ) : null}
      {modalVisible && (
        <ImagePicker
          disableCamera={disableCamera}
          disableGallery={disableGallery}
          isVisible={true}
          setIsVisible={setModalVisible}
          onImagePick={onImagePick}
          options={options}
        />
      )}
    </Block>
  );
};
