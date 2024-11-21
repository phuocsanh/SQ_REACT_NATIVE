import {IMAGES} from 'assets';
import {Block} from 'components';
import {BlockProps} from 'components/base/Block';
import {Image} from 'components/base/Image';
import React, {PropsWithChildren} from 'react';
import {COLORS} from 'theme';

export type ViewShadowImageProps = PropsWithChildren<
  Partial<{
    showImg?: boolean;
    marginTopImg?: number;
    marginBottomImg?: number;
    containerProps?: BlockProps;
  }>
>;

export const ViewShadowImage = ({
  showImg = false,
  marginTopImg = 40,
  marginBottomImg = 40,
  containerProps,
  children,
}: ViewShadowImageProps) => {
  return (
    <Block
      radius={10}
      shadow="Sky"
      backgroundColor={COLORS.white}
      {...containerProps}>
      <>{children}</>
      {showImg && (
        <Block
          alignSelf={'center'}
          marginTop={marginTopImg}
          marginBottom={marginBottomImg}
          justifyContent={'center'}>
          <Image
            resizeMode="contain"
            source={IMAGES.img_cart}
            width={358}
            height={301}
            radius={10}
          />
        </Block>
      )}
    </Block>
  );
};
