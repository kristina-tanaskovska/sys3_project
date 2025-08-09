import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage() {
  const { cardId } = useParams();

  const [isFirstTime, setIsFirstTime] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    minTemp: "",
    maxTemp: "",
    minHumidity: "",
    maxHumidity: "",
    minMoisture: "",
    maxMoisture: "",
    acOn: false,
    humidifierOn: false,
    wateringOn: false
  });

  useEffect(() => {
    axios
      .get(`http://88.200.63.148:6868/garden-settings/${cardId}`, { withCredentials: true })
      .then(({ data }) => {
        setIsFirstTime(Boolean(data.isFirstTime));
        setSettings({
          minTemp: data.minTemp ?? "",
          maxTemp: data.maxTemp ?? "",
          minHumidity: data.minHumidity ?? "",
          maxHumidity: data.maxHumidity ?? "",
          minMoisture: data.minMoisture ?? "",
          maxMoisture: data.maxMoisture ?? "",
          acOn: Boolean(data.acOn),
          humidifierOn: Boolean(data.humidifierOn),
          wateringOn: Boolean(data.wateringOn),
        });
      })
      .catch((err) => {
        console.error(err);
        // stay with defaults; first-time UI will show if needed
        setIsFirstTime(true);
      });
  }, [cardId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const validate = () => {
    const asNum = (v) => (v === "" ? null : Number(v));
    const minT = asNum(settings.minTemp);
    const maxT = asNum(settings.maxTemp);
    const minH = asNum(settings.minHumidity);
    const maxH = asNum(settings.maxHumidity);
    const minM = asNum(settings.minMoisture);
    const maxM = asNum(settings.maxMoisture);

    const errs = [];
    if (minT != null && maxT != null && minT > maxT) errs.push("Min Temp must be ≤ Max Temp");
    if (minH != null && maxH != null && minH > maxH) errs.push("Min Humidity must be ≤ Max Humidity");
    if (minM != null && maxM != null && minM > maxM) errs.push("Min Moisture must be ≤ Max Moisture");

    if (errs.length) {
      alert(errs.join("\n"));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);

    // send numbers or null; booleans as true/false
    const toNum = (v) => (v === "" ? null : Number(v));

    const payload = {
      minTemp: toNum(settings.minTemp),
      maxTemp: toNum(settings.maxTemp),
      minHumidity: toNum(settings.minHumidity),
      maxHumidity: toNum(settings.maxHumidity),
      minMoisture: toNum(settings.minMoisture),
      maxMoisture: toNum(settings.maxMoisture),
      acOn: !!settings.acOn,
      humidifierOn: !!settings.humidifierOn,
      wateringOn: !!settings.wateringOn
    };

    try {
      const { data } = await axios.post(
        `http://88.200.63.148:6868/garden-settings/${cardId}`,
        payload,
        { withCredentials: true }
      );
      alert(data.Message || "Settings saved successfully");
      setIsFirstTime(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Garden Settings</h2>

      {isFirstTime && (
        <div className="settings-instructions" role="note">
          <h4>First time here?</h4>
          <ol>
            <li>Enter <strong>Min</strong> and <strong>Max</strong> values for Temperature, Humidity, and Moisture.</li>
            <li>Use the switches to turn on/off AC, Humidifier, and Watering System.</li>
            <li>Click <strong>Save</strong> to store your preferences.</li>
          </ol>
        </div>
      )}

      <div className="settings-grid">
        <label htmlFor="minTemp">Min Temp (°C)</label>
        <input id="minTemp" name="minTemp" type="number" step="0.1" value={settings.minTemp} onChange={handleInput} />

        <label htmlFor="maxTemp">Max Temp (°C)</label>
        <input id="maxTemp" name="maxTemp" type="number" step="0.1" value={settings.maxTemp} onChange={handleInput} />

        <label htmlFor="minHumidity">Min Humidity (%)</label>
        <input id="minHumidity" name="minHumidity" type="number" step="0.1" value={settings.minHumidity} onChange={handleInput} />

        <label htmlFor="maxHumidity">Max Humidity (%)</label>
        <input id="maxHumidity" name="maxHumidity" type="number" step="0.1" value={settings.maxHumidity} onChange={handleInput} />

        <label htmlFor="minMoisture">Min Moisture (%)</label>
        <input id="minMoisture" name="minMoisture" type="number" step="0.1" value={settings.minMoisture} onChange={handleInput} />

        <label htmlFor="maxMoisture">Max Moisture (%)</label>
        <input id="maxMoisture" name="maxMoisture" type="number" step="0.1" value={settings.maxMoisture} onChange={handleInput} />
      </div>

      <div className="toggle-section">
        <label className="toggle">
          <input type="checkbox" name="acOn" checked={settings.acOn} onChange={handleToggle} />
          <span className="toggle-slider" />
          <span className="toggle-label">AC</span>
        </label>

        <label className="toggle">
          <input type="checkbox" name="humidifierOn" checked={settings.humidifierOn} onChange={handleToggle} />
          <span className="toggle-slider" />
          <span className="toggle-label">Humidifier</span>
        </label>

        <label className="toggle">
          <input type="checkbox" name="wateringOn" checked={settings.wateringOn} onChange={handleToggle} />
          <span className="toggle-slider" />
          <span className="toggle-label">Watering</span>
        </label>
      </div>

      <button className="save-button" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}

export default SettingsPage;