import { Role } from "@/services/role.service";
import { computed, ref } from "vue";

export interface RoleSelection extends Role {
  isSelected?: boolean;
  subroles: RoleSelection[];
  makeParentsFalse?: boolean;
}

const useRole = () => {
  const roles = ref([] as RoleSelection[]);
  const selectRole = (r: string) => {
    const makeAllSubrolesTrue = (rSelection: RoleSelection): RoleSelection => {
      const subroles = rSelection.subroles ? rSelection.subroles.map(makeAllSubrolesTrue) : [];
      return {
        ...rSelection,
        isSelected: true,
        subroles,
        makeParentsFalse: false,
      };
    };
    const roleMapper = (rSelection: RoleSelection): RoleSelection => {
      const isMatch = rSelection.name === r;
      const mapFunction = isMatch && !rSelection.isSelected ? makeAllSubrolesTrue : roleMapper;
      const subroles = rSelection.subroles ? rSelection.subroles.map(mapFunction) : [];

      const shouldThisRoleBeFalse = subroles.reduce((accumulator, roleSelection: RoleSelection) => {
        const mfs = !!roleSelection.makeParentsFalse;
        return accumulator || mfs;
      }, false);
      const makeParentsFalse = (isMatch && rSelection.isSelected) || shouldThisRoleBeFalse;
      const shouldThisRoleBeTrue = subroles.reduce((accumulator, roleSelection: RoleSelection) => {
        const is = !!roleSelection.isSelected;
        return accumulator && is;
      }, subroles.length > 0);
      // equivilant: shouldThisRoleBeFalse ? false : shouldThisRoleBeTrue ? true : rSelection.isSelected;
      const unmatchedResult = (rSelection.isSelected || shouldThisRoleBeTrue) && !shouldThisRoleBeFalse;
      const isSelected = isMatch ? !rSelection.isSelected : unmatchedResult;
      return {
        ...rSelection,
        // invert selection here
        isSelected,
        subroles,
        makeParentsFalse,
      } as RoleSelection;
    };

    roles.value = roles.value.map(roleMapper);
  };
  const reduceRoleRecursive = (accumulator: string[], currentRole: RoleSelection): string[] => {
    const result = [] as string[];
    if (currentRole.isSelected) {
      result.push(currentRole.name);
    }
    return [...accumulator, ...result, ...currentRole.subroles.reduce(reduceRoleRecursive, [] as string[])];
  };
  const rolesAsArray = computed(() => roles.value.reduce(reduceRoleRecursive, [] as string[]));

  const convertArrayToRole = (array: string[]) => {
    const recursiveMapperFunction = (roleSelection: RoleSelection): RoleSelection => {
      const { subroles, name } = roleSelection;
      const isSelected = array.includes(name);
      // eslint-disable-next-line
      const insertObject = {} as any;
      if (Array.isArray(subroles) && subroles.length > 0) {
        insertObject.subroles = roleSelection.subroles.map(recursiveMapperFunction);
      }
      return { ...roleSelection, isSelected, ...insertObject };
    };
    roles.value = roles.value.map(recursiveMapperFunction);
  };

  return {
    selectRole,
    roles,
    rolesAsArray,
    convertArrayToRole,
  };
};

export default useRole;
