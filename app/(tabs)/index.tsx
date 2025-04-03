import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";

const PlaceholderImage = require("@/assets/images/placeholder-image.png");

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1
        })

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true)
        } else {
            alert("You did not select any image.");
        }
    }

    const onReset = () => {
        setShowAppOptions(false);
    }

    const onAddSticker = () => { 
        setIsModalVisible(true);
    }

    const onSaveImageAsync = () => { }

    const onModalClose = () => {
        setIsModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                    </View>
                </View>

            ) : (
                <View style={styles.footerContainer}>
                    <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
                    <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
                </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>

            </EmojiPicker>
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
    optionsContainer: {
        position: 'absolute',
        bottom: 80
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row'
    }
})