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
import {Alert} from 'react-native';
import {CommonOptions, Options} from 'react-native-image-crop-picker';
import {COLORS, reverseHScale, width} from 'theme';
import {IS_IOS} from 'util/constant';

type MultiImageInputProps<F extends FieldValues> = {
  label?: string;
  require?: boolean;
  placeholderTitle?: string;
  name: FieldPath<F>;
  control: Control<F>;
  options?: CommonOptions & Partial<Extract<Options, {mediaType: 'photo'}>> & {multiple?: true};
  containerProps?: BlockProps;
  placeholderProps?: PressableProps;
  imagePreviewProps?: ImageProps;
  placeholderSize?: number;
  /**
   * Max image size in MB
   * 0 = unlimited size
   * @default 5MB
   */
  maxSize?: number;
  /**
   * @default 5
   */
  maxImage?: number;
};

const ITEM_WIDTH = reverseHScale((width - 24) / 4);

/**
 * @todo
 * implement upload on picked image
 */
export const MultiImageInput = <F extends FieldValues>({
  label,
  placeholderTitle = 'Chọn hình ảnh',
  name,
  control,
  options,
  require,
  containerProps,
  placeholderProps,
  imagePreviewProps,
  maxSize = 5,
  maxImage = 5,
}: MultiImageInputProps<F>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  const image = value as PickerImage[] | undefined;

  const onImagePick = (imgs: PickerImage[]) => {
    let hadImageOversize = false;
    const filterImage = imgs.filter(x => {
      if (maxSize && x.size > maxSize * 1048576) {
        hadImageOversize = true;
        return false;
      }
      return !image?.some(o =>
        IS_IOS ? o.localIdentifier === x.localIdentifier : o.size === x.size,
      );
    });
    onChange((image ? [...image, ...filterImage] : filterImage).slice(0, maxImage));
    if (hadImageOversize) {
      // TODO replace with custom toast
      Alert.alert(
        'Kích thước hình ảnh không phù hợp!',
        `Bạn không thể chọn hình ảnh có dung lượng vượt quá ${maxSize} MB`,
      );
    }
  };

  const onDeleteImage = (index: number) => {
    onChange(image?.filter((_, i) => i !== index));
  };

  const renderPlaceHolder = () => {
    return (
      <Pressable
        square={ITEM_WIDTH}
        onPress={() => setModalVisible(true)}
        borderStyle="dashed"
        borderWidth={1}
        borderColor={COLORS.primary}
        backgroundColor={COLORS.lightCyan}
        radius={10}
        contentCenter
        {...placeholderProps}>
        <Image source={ICONS.ic_upload_image} square={ITEM_WIDTH / 3} resizeMode="contain" />
        {placeholderTitle ? (
          <Text fontSize={10} marginTop={5}>
            {placeholderTitle}
          </Text>
        ) : null}
      </Pressable>
    );
  };

  const renderImagePreview = () => {
    return (
      <>
        {image?.map((x, i) => (
          <Image
            key={x.path}
            source={{uri: x.path}}
            resizeMode="cover"
            square={ITEM_WIDTH}
            {...imagePreviewProps}>
            <Pressable position="absolute" right={5} top={5} onPress={() => onDeleteImage(i)}>
              <Icon type="AntDesign" name="closecircle" size={20} color={COLORS.backgroundIcon} />
            </Pressable>
          </Image>
        ))}
      </>
    );
  };

  return (
    <Block {...containerProps}>
      {label ? (
        <Text fontSize={16} font="semiBold" marginBottom={10}>
          {label} {require && <Text color={COLORS.red}>*</Text>}
        </Text>
      ) : null}
      <Block row wrap>
        {image ? renderImagePreview() : null}
        {!image || image.length < maxImage ? renderPlaceHolder() : null}
      </Block>
      {error?.message ? (
        <Text color={COLORS.red} fontSize={14} marginTop={8}>
          {error.message}
        </Text>
      ) : null}
      {modalVisible && (
        <ImagePicker
          isVisible={true}
          setIsVisible={setModalVisible}
          onImagePick={onImagePick}
          options={{...options, multiple: true, maxFiles: maxImage}}
        />
      )}
    </Block>
  );
};
