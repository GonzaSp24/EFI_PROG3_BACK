// CommonJS wrapper for ES6 models
// This file allows CommonJS code (routes, middleware) to import models

let modelsCache = null;

async function getModels() {
    if (!modelsCache) {
        const { models } = await import('./index.js');
        modelsCache = models;
    }
    return modelsCache;
}

// Synchronous access (requires models to be initialized first)
function getModelsSync() {
    if (!modelsCache) {
        throw new Error('Models not initialized. Call initDatabase() first.');
    }
    return modelsCache;
}

module.exports = {
    getModels,
    getModelsSync,
    // Export individual models as getters for convenience
    get User() { return getModelsSync().User; },
    get Role() { return getModelsSync().Role; },
    get Customer() { return getModelsSync().Customer; },
    get Brand() { return getModelsSync().Brand; },
    get DeviceModel() { return getModelsSync().DeviceModel; },
    get Device() { return getModelsSync().Device; },
    get CustomerDevice() { return getModelsSync().CustomerDevice; },
    get RepairOrder() { return getModelsSync().RepairOrder; },
    get OrderHistory() { return getModelsSync().OrderHistory; },
    get RepairTask() { return getModelsSync().RepairTask; },
    get Diagnostic() { return getModelsSync().Diagnostic; },
    get TestChecklistItem() { return getModelsSync().TestChecklistItem; },
    get Supplier() { return getModelsSync().Supplier; },
    get Part() { return getModelsSync().Part; },
    get PartCompatibility() { return getModelsSync().PartCompatibility; },
    get InventoryMovement() { return getModelsSync().InventoryMovement; },
    get Quote() { return getModelsSync().Quote; },
    get QuoteItem() { return getModelsSync().QuoteItem; },
    get Invoice() { return getModelsSync().Invoice; },
    get Payment() { return getModelsSync().Payment; },
    get OrderStatus() { return getModelsSync().OrderStatus; },
    get PaymentMethod() { return getModelsSync().PaymentMethod; },
    get Attachment() { return getModelsSync().Attachment; },
};
