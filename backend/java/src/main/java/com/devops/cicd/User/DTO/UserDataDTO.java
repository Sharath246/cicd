package com.devops.cicd.User.DTO;

import java.util.List;

public record UserDataDTO(String name, String email, List<String>friends) {
}
