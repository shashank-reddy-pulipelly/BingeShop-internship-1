
import { FloatingAction } from 'react-native-floating-action';

const Floating=()=>{
    const actions = [{
        text: 'Accessibility',
        icon: require('../../assets/banners/slider6.jpg'),
        name: 'bt_accessibility',
        position: 2
      }, {
        text: 'Language',
        icon: require('../../assets/banners/slider6.jpg'),
        name: 'bt_language',
        position: 1
      }, {
        text: 'Location',
        icon: require('../../assets/banners/slider6.jpg'),
        name: 'bt_room',
        position: 3
      }, {
        text: 'Video',
        icon: require('../../assets/banners/slider6.jpg'),
        name: 'bt_videocam',
        position: 4
      }];
      
    return(
        <FloatingAction
        actions={actions}
        onPressItem={
          (name) => {
            console.log(`selected button: ${name}`);
          }
        }
      />
    );
}