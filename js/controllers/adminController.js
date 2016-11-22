angular.module("qBeaconAdmin").controller("adminController", function($scope, adminService) {
    $scope.models = ["bloco", "sala"];
    $scope.modelsData = {};
    $scope.modelsDataCreated = {};
    $scope.historic = [];
    $scope.appName = "QBeaconAdmin";
    
    var loadModels = function() {
        $scope.models.map(function(m) {
            adminService.getAll(m).success(function(data, status) {
                $scope.modelsData[m] = data;
            }).error(function(data, status) {
                console.log("Não foi possível carregar os objetos!");
            });
        });

        adminService.getAll("historico").success(function(data, status) {
            $scope.historic = data;
        }).error(function(data, status) {
            console.log("Não foi possível carregar o histórico!");
        });
    }

    var isToUpdate = function(model, object) {
        return $scope.modelsData[model].some(function(o) {
            return o.key == object.key;
        });
    }

    $scope.updateBeacons = function() {
        adminService.updateBeacons().success(function() {
            Materialize.toast("Beacons atualizados!", 3000, 'rounded');
        }).error(function() {
            Materialize.toast("Erro ao atualizar beacons!", 3000, 'rounded');
        });
    };

    $scope.saveObject = function(model, object) {
        if(isToUpdate(model, object)) {
            adminService.update(model, object).success(function(data, status) {
                Materialize.toast(model + " atualizado!", 3000, 'rounded');
                object.name = null;
                object.key = null;
                loadModels();
            }).error(function(data, status) {
                Materialize.toast("Erro ao atualizar " + model + "!", 3000, 'rounded');
            });
        } else {
            adminService.save(model, object).success(function(data, status) {
                Materialize.toast(model + " salvo!", 3000, 'rounded');
                object.name = null;
                object.key = null;
                loadModels();
            }).error(function(data, status) {
                Materialize.toast("Erro ao salvar " + model + "!", 3000, 'rounded');
            });
        }
    };

    $scope.selectObject = function(model, object) {
        $scope.modelsDataCreated[model] = angular.copy(object);

        setTimeout(function() {
            Materialize.updateTextFields();
        }, 500);
    };

    $scope.removeObject = function(model, object) {
        adminService.remove(model, object).success(function(data, status) {
            Materialize.toast(model + " removido!", 3000, 'rounded');
            loadModels();
        }).error(function(data, status) {
            Materialize.toast("Erro ao remover " + model + "!", 3000, 'rounded');
        });
    };

    loadModels();
});