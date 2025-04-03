import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

const PlaceholderImage = require("@/assets/images/placeholder-image.png");

export default function Index() {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1
        })
        
        if (!result.canceled) {
            console.log(result);
        } else {
            alert("You did not select any image.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </View>
            <View style={styles.footerContainer}>
                <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
                <Button label="Use this photo" onPress={() => {}} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e'
    },
    imageContainer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
})