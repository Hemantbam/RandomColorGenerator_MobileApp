import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    useColorScheme,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Clipboard,
} from 'react-native';

function AppPro(): JSX.Element {
    const [color, setColor] = useState('');
    const [colorHistory, setColorHistory] = useState<string[]>([]); 

    const handleColorChange = async (backgroundColor: string) => {
        setColor(backgroundColor);
        await Alert.alert(`You just selected ${backgroundColor} Background Color`);
        setColorHistory((prevHistory) => [...prevHistory, backgroundColor]);
    };

    const handleRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setColor(randomColor);
        setColorHistory((prevHistory) => [...prevHistory, randomColor]);
        Alert.alert(`Generated color is "${randomColor}"`);
    };

    // Function to copy color code to clipboard
    const copyToClipboard = (colorCode: string) => {
        Clipboard.setString(colorCode);
        Alert.alert(`Color code ${colorCode} copied to clipboard!`);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.heading}>Background Color Changer</Text>
            <View style={[styles.container, { backgroundColor: color }]}>
                <View style={styles.rowOne}>
                    <Text onPress={() => handleColorChange('#FF0000')} style={[styles.button]}>
                        Red
                    </Text>
                    <Text onPress={() => handleColorChange('#00FF00')} style={[styles.button]}>
                        Green
                    </Text>
                    <Text onPress={() => handleColorChange('#0000FF')} style={[styles.button]}>
                        Blue
                    </Text>
                </View>
                <View style={styles.rowTwo}>
                    <Text style={styles.infoText}>Do you want to generate a random color?</Text>
                    <Text onPress={handleRandomColor} style={[styles.button]}>
                        Generate a random color
                    </Text>
                </View>
                
                <View style={styles.historyBox}>
                    <Text style={styles.historyTitle}>Color History:</Text>
                    <ScrollView>
                        {colorHistory.map((color, index) => (
                            <View key={index} style={styles.historyItemContainer}>
                                <View
                                    style={[styles.colorBox, { backgroundColor: color }]}
                                />
                                <Text style={styles.historyItem}>{color}</Text>
                                <TouchableOpacity onPress={() => copyToClipboard(color)} style={styles.copyButton}>
                                    <Text style={styles.copyText}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        justifyContent: 'center',
        fontWeight: '600',
        paddingVertical: 12,
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 7,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#efaa00',
        borderRadius: 30,
        marginVertical: 10,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    rowOne: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    rowTwo: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    historyBox: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginTop: 30,
        width: '90%',
        borderRadius: 10,
        maxHeight: 250,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    historyItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorBox: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10,
    },
    historyItem: {
        fontSize: 16,
        color: '#555',
        paddingVertical: 2,
        flex: 1,
    },
    copyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    copyText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default AppPro;
